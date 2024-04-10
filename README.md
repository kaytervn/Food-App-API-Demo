<h2>Food App API</h2>

<h3>Users API</h3>

| Request     | Method | URL                                                    | Body Type | Arguments             |
| ----------- | ------ | ------------------------------------------------------ | --------- | --------------------- |
| Get user    | GET    | https://food-app-api-demo.onrender.com/api/users/:id   | N/A       | N/A                   |
| Login       | POST   | https://food-app-api-demo.onrender.com/api/users/login | raw JSON  | email, password       |
| Register    | POST   | https://food-app-api-demo.onrender.com/api/users/      | raw JSON  | name, email, password |
| Update user | PUT    | https://food-app-api-demo.onrender.com/api/users/:id   | form-data | image (file)          |

<h3>Foods API</h3>

| Request     | Method | URL                                                  | Body Type | Arguments                  |
| ----------- | ------ | ---------------------------------------------------- | --------- | -------------------------- |
| Get foods   | GET    | https://food-app-api-demo.onrender.com/api/foods/    | N/A       | N/A                        |
| Create food | POST   | https://food-app-api-demo.onrender.com/api/foods/    | form-data | image (file), title, price |
| Delete food | DELETE | https://food-app-api-demo.onrender.com/api/foods/:id | N/A       | N/A                        |
