import sql from 'mssql';
import { executeWithCallback } from '../../Db';

exports.get = (req, res, next) => {
  var query = "exec MENA_Get_OverSightGlobals";
  var request = new sql.Request();
  request.query(query, function (err, resu) {
    if (err) {
      next();
    }
    else {
     var test = resu.recordsets;
     var dbData = {
      types: [],
      units: []
     }
     var types = test[0];
     dbData.types = types;
     dbData.units = test[1];

     console.log(types);
     res.send({dbData})
     }
  });

}

exports.post = (req, res, next) => {
  const topicsName = req.body.name;
  const query = "exec MENA_Set_Topic  @topicsName='"+topicsName+"'"; 
  executeWithCallback((err, resu) => {
    if (err) {
      next(err);
    }
    else {
      if(resu.rowsAffected)
        {			
          res.send({
            dbData: {
              "message":"Topics Inserted Successfully.",
              "result":{
                "id":resu.recordset[0].last_insert_id,
                "name":topicsName
              }
            }           
          });
        }
    }
  },query);
}

exports.put = (req, res, next) => {
  const topicsId = req.body.id;  
  const topicsName = req.body.name;
  const query = "exec MENA_Update_Topic  @topicsName='"+topicsName+"', @id="+topicsId; 
  executeWithCallback((err, resu)=> {
    if (err) {
      next(err);
    }
    else {
      if(resu.rowsAffected)
      {
        res.send({
          dbData: 'topics Updated Successfully.'
        });
      }
    }
  },query);
}

exports.delete = function(req, res, next) {

  const topicsId = req.params.id;
  const query = "exec MENA_Delete_Topic  @id="+topicsId; 
  executeWithCallback((err, resu)=> {
    if (err) {
      next(err);
    }
    else {
      if(resu)
      {
        res.send({
          dbData: 'topics Deleted Successfully.'
        });
      }
    }
  },query);
}

exports.getOne = function(req, res, next) {
  res.send({
    dbData: {}
  });
}
