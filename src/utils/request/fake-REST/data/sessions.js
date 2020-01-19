/* eslint-disable */
const data = {
  "success": true,
  "code": 201,
  "data": [
    {
      "id": "1a",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-01 12:00",
        "to": "2019-01-01 13:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "1a"
          }
        }
      }
    },
    {
      "id": "2b",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-01 14:00",
        "to": "2019-01-01 15:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "1a"
          }
        }
      }
    },
    {
      "id": "3c",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-01 16:00",
        "to": "2019-01-01 17:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "1a"
          }
        }
      }
    },
    {
      "id": "4d",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-03 12:00",
        "to": "2019-01-03 13:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "2b"
          }
        }
      }
    },
    {
      "id": "5e",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-03 14:00",
        "to": "2019-01-03 15:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "2b"
          }
        }
      }
    },
    {
      "id": "6f",
      "type": "sessions",
      "attributes": {
        "from": "2019-01-03 16:00",
        "to": "2019-01-03 17:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "2b"
          }
        }
      }
    },
    {
      "id": "7g",
      "type": "sessions",
      "attributes": {
        "from": "2019-02-03 13:00",
        "to": "2019-02-03 14:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "3c"
          }
        }
      }
    },
    {
      "id": "8h",
      "type": "sessions",
      "attributes": {
        "from": "2019-02-03 15:00",
        "to": "2019-02-03 16:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "3c"
          }
        }
      }
    },
    {
      "id": "9i",
      "type": "sessions",
      "attributes": {
        "from": "2019-03-03 10:00",
        "to": "2019-03-03 12:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "4d"
          }
        }
      }
    },
    {
      "id": "10j",
      "type": "sessions",
      "attributes": {
        "from": "2019-03-03 12:00",
        "to": "2019-03-03 16:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "4d"
          }
        }
      }
    },
    {
      "id": "11k",
      "type": "sessions",
      "attributes": {
        "from": "2019-03-03 12:00",
        "to": "2019-03-03 16:00"
      },
      "relationships": {
        "performance": {
          "data": {
            "type": "performances",
            "id": "5e"
          }
        }
      }
    },
  ]
};

export default JSON.stringify(data);
