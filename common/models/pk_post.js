"use strict";
var util = require("util");
var moment = require("moment");
var md5 = require("md5");
module.exports = function (PK_POST) {

  PK_POST.inputdata = function (cb) {
    var app = require("../../server/server");
    var PK_SYNC = app.models.PK_SYNC;
    var AUTH_API = app.models.AUTH_API;
    PK_SYNC.getAll({
      "username": "reza",
      "password": "reza"
    }, (err, response) => {
      console.log(response)
      console.log(err)
      // console.log(response.data.data.PK_POST)
      if (util.isNullOrUndefined(err)) {
        for (let data in response.data.data.PK_POST) {
          PK_POST.upsert({
              KODEH2H: response.data.data.PK_POST[data].KODEH2H,
              USERNAME: response.data.data.PK_POST[data].USERNAME,
              PASSWORD: response.data.data.PK_POST[data].PASSWORD,
              CAB: response.data.data.PK_POST[data].CAB,
              PK: response.data.data.PK_POST[data].PK,
              NOREK: response.data.data.PK_POST[data].NOREK,
              NAMA: response.data.data.PK_POST[data].NAMA,
              LAHIR: response.data.data.PK_POST[data].LAHIR,
              BUKA: response.data.data.PK_POST[data].BUKA,
              TEMPO: response.data.data.PK_POST[data].TEMPO,
              PLAN: response.data.data.PK_POST[data].PLAN,
              AMOUNT: response.data.data.PK_POST[data].AMOUNT,
              ID_NO: response.data.data.PK_POST[data].ID_NO,
              KTP: response.data.data.PK_POST[data].KTP,
              RATE: response.data.data.PK_POST[data].RATE,
              SEX: response.data.data.PK_POST[data].SEX,
              RATE_ASURANSI: response.data.data.PK_POST[data].RATE_ASURANSI,
              DATE_CREATED: response.data.data.PK_POST[data].DATE_CREATED,
              DATE_MODIFIED: response.data.data.PK_POST[data].DATE_MODIFIED
            },
            (err, res) => {
              // if (util.isNullOrUndefined(err)) {
              //   var data = {
              //     status: "200",
              //     message: "Data sudah di input"
              //   };

              //   cb(null, data);
              // } else {
              //   console.log(err);
              //   var data = {
              //     statusCode: "404",
              //     message: "You dont have permission to access this service"
              //   };

              //   cb(data);
              // }
            }
          );
        }



        // input auth
        for (let data in response.data.data.AUTH_API) {

          var filterWhere = {
            where: {
              and: [{
                  KODEH2H: response.data.data.AUTH_API[data].KODEH2H
                },
                {
                  USERNAME: response.data.data.AUTH_API[data].USERNAME
                },
                {
                  PASSWORD: response.data.data.AUTH_API[data].PASSWORD
                }
              ]
            }
          };
          AUTH_API.findOne(filterWhere, (err, res) => {
            console.log(res);
            if (util.isNullOrUndefined(res)) {
              AUTH_API.create({
                  KODEH2H: response.data.data.AUTH_API[data].KODEH2H,
                  USERNAME: response.data.data.AUTH_API[data].USERNAME,
                  PASSWORD: response.data.data.AUTH_API[data].PASSWORD,
                  LAST_ACCESS: response.data.data.AUTH_API[data].LAST_ACCESS,
                  DATE_CREATED: response.data.data.AUTH_API[data].DATE_CREATED,
                  DATE_MODIFIED: response.data.data.AUTH_API[data].DATE_MODIFIED
                },
                (error, res) => {

                }
              )

            } else {
              AUTH_API.updateAll({
                  and: [{
                      KODEH2H: response.data.data.AUTH_API[data].KODEH2H
                    },
                    {
                      USERNAME: response.data.data.AUTH_API[data].USERNAME
                    },
                    {
                      PASSWORD: response.data.data.AUTH_API[data].PASSWORD
                    }
                  ]
                }, {
                  LAST_ACCESS: response.data.data.AUTH_API[data].LAST_ACCESS,
                  DATE_CREATED: response.data.data.AUTH_API[data].DATE_CREATED,
                  DATE_MODIFIED: response.data.data.AUTH_API[data].DATE_MODIFIED
                },
                (error, res) => {

                }
              )
            }
          });
        }


        var data = {
          status: "200",
          message: "Data sudah di input"
        };
        cb(null, data);
      } else {
        var data = {
          statusCode: "404",
          message: "You dont have permission to access this service"
        };
        cb(data);
      }


    })
  }

  PK_POST.remoteMethod("inputdata", {
    http: {
      path: "/auth",
      verb: "post"
    },
    returns: {
      arg: "data",
      type: "object",
      http: {
        source: "body"
      }
    }
  });

  // PK_POST.getall = function(cb) {
  //   PK_POST.find({}, function(err, data) {
  //     cb(null, data);
  //   });
  // };


};
