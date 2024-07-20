// lib/customResponse.js
export const customResponse = ({ data, type }) => {
    let responseTemplate;
    if (data) {
      if (type === "create") {
        responseTemplate = {
          code: 201,
          data: data,
          message: "Success Create Data!",
        };
      } else if (type === "find") {
        responseTemplate = {
          code: 200,
          data: data,
          message: "Success Find Data!",
        };
      } else if (type === "update") {
        responseTemplate = {
          code: 201,
          data: data,
          message: "Success Update Data!",
        };
      } else if (type === "delete") {
        responseTemplate = {
          code: 200,
          data: data,
          message: "Success Delete Data!",
        };
      }
      return responseTemplate;
    } else {
      return {
        code: 400,
        data: [],
        message: "Bad Request!",
      };
    }
  };
  