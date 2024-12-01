const db = require('../config/database');
const path = require('path');

const getAllProducts = async (req, res) => {

  try {
    //TODO: change select * to only the columns we need
    let sql = 'SELECT * FROM `Product`';
    const [results, fields] = await db.promise().query(sql);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving products"});
  }
};

const getProductById = async (req, res) => {
  try {
    //TODO: change select * to only the columns we need
    id = req.params.id;
    let sql = 'SELECT * FROM `Product` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [id]);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving product"});
  }
}

const getProductForManager = async (req, res) => {
  try {
    const username = req.params.username; // Use const instead of global variable

    // Get supplierID from ProductManager table
    const productManagerSql = 'SELECT supplierID FROM `ProductManager` WHERE username = ?';
    const [productManagerResults] = await db.promise().query(productManagerSql, [username]);

    let supplierID;

    if (productManagerResults.length > 0) {
      supplierID = productManagerResults[0].supplierID;
    } else {
      // Check SalesManager table if not found in ProductManager
      const salesManagerSql = 'SELECT supplierID FROM `SalesManager` WHERE username = ?';
      const [salesManagerResults] = await db.promise().query(salesManagerSql, [username]);
      
      if (salesManagerResults.length === 0) {
        return res.status(404).json({ msg: "Manager not found" });
      }
      supplierID = salesManagerResults[0].supplierID;
    }

    // Get products for the supplier
    const productsSql = 'SELECT * FROM `Product` WHERE supplierID = ?';
    const [results] = await db.promise().query(productsSql, [supplierID]);
    
    return res.status(200).json(results);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ msg: "Error retrieving products" });
  }
}

const getProductImage = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT picturePath FROM `Pictures` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [id]);

    if (results.length > 0) {
      const imagePath = results[0].picturePath;
      const absolutePath = path.join(__dirname, '..', imagePath); // Adjust the path as necessary
      res.sendFile(absolutePath);
    } else {
      res.status(404).json({ msg: "Image not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error retrieving image" });
  }
};

const createProduct = async (req, res) => {
  try {
    let sql = 'INSERT INTO `Product` (stock ,name, unitPrice, overallRating, discountPercentage, description, brand, color, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [req.body.stock, req.body.name, req.body.unitPrice, req.body.overallRating, req.body.discountPercentage, req.body.description, req.body.brand, req.body.color, req.body.supplierID, req.body.material, req.body.capacityLitres, req.body.warrantyMonths, req.body.serialNumber, req.body.popularity]);
    res.status(200).json({msg: "Product created"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error creating product"});
  }
}

const updateProduct = async (req, res) => {
  //this is a general update function, its meant to be implemented in other functions after user authentication
  try {
    let sql = 'UPDATE `Product` SET stock = ?, name = ?, unitPrice = ?, overallRating = ?, discountPercentage = ?, description = ?, brand = ?, color = ?, supplierID = ?, material = ?, capacityLitres = ?, warrantyMonths = ?, serialNumber = ?, popularity = ? WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.stock, req.body.name, req.body.unitPrice, req.body.overallRating, req.body.discountPercentage, req.body.description, req.body.brand, req.body.color, req.body.supplierID, req.body.material, req.body.capacityLitres, req.body.warrantyMonths, req.body.serialNumber, req.body.popularity, req.params.id]);
    res.status(200).json({msg: "Product updated"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error updating product"});
  }
}

const deleteProduct = async (req, res) => {
  try {
    let sql = 'DELETE FROM `Product` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    res.status(200).json({msg: "Product deleted"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error deleting product"});
  }
}

const searchNames = async (query) => {
  try {
    let sql = 'SELECT * FROM `Product` WHERE name LIKE ?';
    const [results, fields] = await db.promise().query(sql, ['%' + query + '%']);
    return results;
  } catch(err) {
    throw err;
  }
}

const searchDescriptions = async (query) => {
  try {
    let sql = 'SELECT * FROM `Product` WHERE description LIKE ?';
    const [results, fields] = await db.promise().query(sql, ['%' + query + '%']);
    return results;
  } catch(err) {
    throw err;
  }
}

const searchMaterials = async (query) => {
  try {
    let sql = 'SELECT * FROM `Product` WHERE material LIKE ?';
    const [results, fields] = await db.promise().query(sql, ['%' + query + '%']);
    return results;
  } catch(err) {
    throw err;
  }
}

const searchColors = async (query) => {
  try {
    let sql = 'SELECT * FROM `Product` WHERE color LIKE ?';
    const [results, fields] = await db.promise().query(sql, ['%' + query + '%']);
    return results;
  } catch(err) {
    throw err;
  }
}

const rankSearchResults = (query, results) => {
  // Convert query to lowercase for case-insensitive matching
  const lowerCaseQuery = query.toLowerCase();

  let rankedResults = [];
  for (let i = 0; i < results.length; i++) {
    let rank = 0;

    // Convert fields to lowercase before checking for inclusion
    if (results[i].name.toLowerCase().includes(lowerCaseQuery)) {
      rank += 3;
    }
    if (results[i].description.toLowerCase().includes(lowerCaseQuery)) {
      rank += 2;
    }
    if (results[i].material.toLowerCase().includes(lowerCaseQuery)) {
      rank += 1;
    }
    if (results[i].color.toLowerCase().includes(lowerCaseQuery)) {
      rank += 1;
    }

    results[i].rank = rank;
    rankedResults.push(results[i]);
  }

  // Sort results by rank in descending order
  rankedResults.sort((a, b) => b.rank - a.rank);
  return rankedResults;
};

const searchProducts = async (req, res) => {
  try {
    let query = req.query.q;
    //check if query is an array, if not, make it an array
    if (!Array.isArray(query)) {
      query = [query];
      console.log("Query converted into array");
    }
    let results = [];
    for (let i = 0; i < query.length; i++) {
      let names = await searchNames(query[i]);
      let descriptions = await searchDescriptions(query[i]);
      let materials = await searchMaterials(query[i]);
      let colors = await searchColors(query[i]);
      rankedResults = rankSearchResults(query[i], names.concat(descriptions, materials, colors));
      results = results.concat(rankedResults);
    }
    //remove duplicates and report the removal
    let uniqueResults = [];
    let duplicateCount = 0;
    for (let i = 0; i < results.length; i++) {
      let isUnique = true;
      for (let j = 0; j < uniqueResults.length; j++) {
        if (results[i].productID == uniqueResults[j].productID) {
          isUnique = false;
          duplicateCount++;
          //add the rank of the duplicate to the original
          uniqueResults[j].rank += results[i].rank;
          break;
        }
      }
      if (isUnique) {
        uniqueResults.push(results[i]);
      }
    }

    //sork the unique results by rank
    uniqueResults.sort((a, b) => b.rank - a.rank);
    let message = uniqueResults.length + " results found";
    res.status(200).json(
      {
        msg: message,
        results: uniqueResults
      }
    );
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error searching products"});
  }
}

const sortProducts = (req, res) => {
  try {
    let products = req.body.results || req.body; // Handle both formats
    const { sortBy, sortOrder } = req.query;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ msg: 'Invalid products array' });
    }

    const sortedProducts = sortProductsUtil(products, sortBy, sortOrder);
    res.status(200).json(sortedProducts);
  } catch (err) {
    console.error('Error sorting products:', err);
    res.status(500).json({ msg: 'Error sorting products' });
  }
};

const sortProductsUtil = (products, sortBy, sortOrder) => {
  if (!sortBy || !sortOrder) {
    //if sortBy or sortOrder is not provided
    //if rank exists in products, sort by rank
    console.log("No sortBy or sortOrder provided, defaulting to productID");
    if(products[0].rank != undefined)
    {
      return products.sort((a, b) => b.rank - a.rank);
    }
    // Default sorting by productID 
    else{
    return products.sort((a, b) => a.productID - b.productID);
    }
  }

  return products.sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    // Convert to float if sorting by unitPrice
    if (sortBy === 'unitPrice' || sortBy === 'discountPercentage', sortBy === 'overallRating', sortBy === 'timeListed', sortBy === 'popularity', sortBy === 'capacityLitres', sortBy === 'warrantyMonths', sortBy === 'stock') {
      fieldA = parseFloat(fieldA);
      fieldB = parseFloat(fieldB);
    }
    
    if (sortOrder.toUpperCase() === 'ASC') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });
};


// //without params (sort by productID)
// //with no query, sort by sortBy and sortOrder (default to productID, asc if missing)
// //with query, search and sort (default to rank, desc if missing)
// const searchAndOrSortProducts = async (req, res) => {
//   try {
//     let query = req.query.q;
//     let sortBy = req.query.sortBy;  
//     let sortOrder = req.query.sortOrder;   

//     // console.log("Query: " + query);
//     // console.log("Sort by: " + sortBy);
//     // console.log("Sort order: " + sortOrder);

//     // //if no query, just sort
//     if (!query) {
//       if(sortBy == undefined && sortOrder == undefined)
//       {
//         sortBy = 'productID';
//         sortOrder = 'ASC';
//         let sql = 'SELECT * FROM `Product` ORDER BY ' + sortBy + ' ' + sortOrder;
//         const [results, fields] = await db.promise().query(sql);
//         return res.status(200).json(results);
//       }
//       else{
//         console.log("No query, just sorting");
//         let sql = 'SELECT * FROM `Product` ORDER BY ' + sortBy + ' ' + sortOrder.toUpperCase();
//         const [results, fields] = await db.promise().query(sql);
//         return res.status(200).json(results);
//       }
//     }

//     // let query;
//     //check if q is an array, if not, make it an array
//     if (!Array.isArray(query)) {
//       query = [query];
//       console.log("Query converted into array");
//     }
//     let results = [];
//     for (let i = 0; i < query.length; i++) {
//       let names = await searchNames(query[i]);
//       let descriptions = await searchDescriptions(query[i]);
//       let materials = await searchMaterials(query[i]);
//       let colors = await searchColors(query[i]);
//       rankedResults = rankSearchResults(query[i], names.concat(descriptions, materials, colors));
//       results = results.concat(rankedResults);
//     }
//     //remove duplicates and report the removal
//     let uniqueResults = [];
//     let duplicateCount = 0;
//     for (let i = 0; i < results.length; i++) {
//       let isUnique = true;
//       for (let j = 0; j < uniqueResults.length; j++) {
//         if (results[i].productID == uniqueResults[j].productID) {
//           isUnique = false;
//           duplicateCount++;
//           // //add the rank of the duplicate to the original
//           uniqueResults[j].rank += results[i].rank;
//           break;
//         }
//       }
//       if (isUnique) {
//         uniqueResults.push(results[i]);
//       }
//     }

//     //if sortBy and sortOrder are provided, sort the unique results by sortBy and sortOrder
//     if (sortBy != undefined && sortOrder != undefined) {
//       //sort the unique results by sortBy and sortOrder
//       uniqueResults.sort((a, b) => {
//         const fieldA = a[sortBy];
//         const fieldB = b[sortBy];
    
//         if (sortOrder.toUpperCase() === 'ASC') {
//           return fieldA - fieldB;
//         } else { // DESC
//           return fieldB - fieldA;
//         }
//       });
//     }
//     else {
//       //sort the unique results by rank
//       uniqueResults.sort((a, b) => b.rank - a.rank);
//     }
//     let message = uniqueResults.length + " results found";
//     res.status(200).json(
//       {
//         msg: message,
//         results: uniqueResults
//       }
//     );
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error searching products"});
//   }
// }


//Section : Sort

//dont need this one
// const sortProductsByID = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY productID';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products (by ID)"});
//   }
// }

// const sortProductsByStockAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY stock';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by stock ascending"});
//   }
// }

// const sortProductsByStockDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY stock DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by stock descending"});
//   }
// }

// const sortProductsByNameAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY name';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by name ascending"});
//   }
// }

// const sortProductsByNameDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY name DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by name descending"});
//   }
// }

// const sortProductsByPriceAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY unitPrice';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by unitPrice ascending"});
//   }
// }

// const sortProductsByPriceDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY unitPrice DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by unitPrice descending"});
//   }
// }

// const sortProductsByRatingAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY overallRating';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by overallRating ascending"});
//   }
// }

// const sortProductsByRatingDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY overallRating DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by overallRating descending"});
//   }
// }

// const sortProductsByDiscountAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY discountPercentage';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by discountPercentage ascending"});
//   }
// }

// const sortProductsByDiscountDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY discountPercentage DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by discountPercentage descending"});
//   }
// }

// const sortProductsByTimeListedAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY timeListed';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by timeListed ascending"});
//   }
// }

// const sortProductsByTimeListedDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY timeListed DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by timeListed descending"});
//   }
// }

// const sortProductsByBrandAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY brand';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by brand ascending"});
//   }
// }

// const sortProductsByBrandDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY brand DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by brand descending"});
//   }
// }

// const sortProductsByColorAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY color';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by color ascending"});
//   }
// }

// const sortProductsByColorDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY color DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by color descending"});
//   }
// }

// const sortProductsBySupplierAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY supplierID';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by supplierID ascending"});
//   }
// }

// const sortProductsBySupplierDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY supplierID DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by supplierID descending"});
//   }
// }

// const sortProductsByMaterialAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY material';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by material ascending"});
//   }
// }

// const sortProductsByMaterialDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY material DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by material descending"});
//   }
// }

// const sortProductsByCapacityAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY capacityLitres';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by capacityLitres ascending"});
//   }
// }

// const sortProductsByCapacityDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY capacityLitres DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by capacityLitres descending"});
//   }
// }

// const sortProductsByWarrantyAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY warrantyMonths';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by warrantyMonths ascending"});
//   }
// }

// const sortProductsByWarrantyDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY warrantyMonths DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by warrantyMonths descending"});
//   }
// }

// const sortProductsByPopularityAscending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY popularity';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by popularity ascending"});
//   }
// }

// const sortProductsByPopularityDescending = async (req, res) => {
//   try {
//     let sql = 'SELECT * FROM `Product` ORDER BY popularity DESC';
//     const [results, fields] = await db.promise().query(sql);
//     res.status(200).json(results);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: "Error sorting products by popularity descending"});
//   }
// }


module.exports = {
  getAllProducts,
  getProductById,
  //getProductBySupplierId,
  getProductForManager,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  sortProducts,
  // searchAndOrSortProducts,
  // sortProductsByStockAscending,
  // sortProductsByStockDescending,
  // sortProductsByNameAscending,
  // sortProductsByNameDescending,
  // sortProductsByPriceAscending,
  // sortProductsByPriceDescending,
  // sortProductsByRatingAscending,
  // sortProductsByRatingDescending,
  // sortProductsByDiscountAscending,
  // sortProductsByDiscountDescending,
  // sortProductsByTimeListedAscending,
  // sortProductsByTimeListedDescending,
  // sortProductsByBrandAscending,
  // sortProductsByBrandDescending,
  // sortProductsByColorAscending,
  // sortProductsByColorDescending,
  // sortProductsBySupplierAscending,
  // sortProductsBySupplierDescending,
  // sortProductsByMaterialAscending,
  // sortProductsByMaterialDescending,
  // sortProductsByCapacityAscending,
  // sortProductsByCapacityDescending,
  // sortProductsByWarrantyAscending,
  // sortProductsByWarrantyDescending,
  // sortProductsByPopularityAscending,
  // sortProductsByPopularityDescending
  getProductImage
};
