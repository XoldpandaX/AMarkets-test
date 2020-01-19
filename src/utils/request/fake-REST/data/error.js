/* eslint-disable */
export const data = {
  "success": false,
  "code": 400,
  "errors_tree": {
    "data": {
      "birthday": ["unexpected format"],
      "payment": {
        "card": {
          "valid_thru": ["expired"]
        }
      }
    }
  }
};

export default JSON.stringify(data);
