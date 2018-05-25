import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _ from 'lodash';
var signToken = require('./auth').signToken;


/**
 * @api {post} userlogin User Login
 * @apiParam {String} userName Mandatory userName.
 * @apiParam {String} password Mandatory password.
 * @apiName userLoginAuth
 * @apiGroup Login Auth
 *
 *
 * @apiSuccess {json} success reponse.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *	      dbData: 
          {
            "User_Id": 1,
            "Name": "Raj",
            "Email": "git.mcbitss@gmail.com",
            "Title": null,
            "userGroup": [
              {
                  "id": 1,
                  "name": "Group1"
              },
              {
                  "id": 2,
                  "name": "Group2"
              }
            ],
            "userRole": [
              {
                  "id": 1,
                  "name": "Oversights Owners"
              },
              {
                  "id": 2,
                  "name": "Headquarters Officials"
              }
            ],
            "userMenu": [
              {
                  "id": 1,
                  "name": "Menu1"
              },
              {
                  "id": 2,
                  "name": "Menu2"
              }
            ]
          }
 *		  }
 *
 * @apiError Common Request unsuccessful please contact the admin..
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Request unsuccessful please contact the admin."
 *     }
 */
exports.signin = (req, res, next)=> {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user.id);
  res.json({dbData:{ token, user: req.user }});
};
