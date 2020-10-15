# Project Name: Dental Application

## Project Description:

  Web application helping dental tehnicians manage data about doctos, pacients, orders using and authentication system.

## GitHub Pages Link: [Web Application Preview](https://pavelescuvictor.github.io/DentalApplication/)

<<<<<<< HEAD
  Some the functionalities of this web application cannot be used in the Live Preview. The frontend is using http request to communicate with the backend for the authentication.<br>
  Adding Project on Heroku or AWS in the future.
=======
Some the functionalities of this web application cannot be used in the Live Preview. The frontend is using http request to communicate with the backend for the authentication.<br>
Adding Project on Heroku or AWS in the future.
>>>>>>> dev

## API:

Backend contains an API that uses REST Arhitecture created using Django Rest Framework and Python.

### API Endpoints:

**USERS** <br>
<<<<<<< HEAD

| Requests                                         |      Request Description                |
|:------------------------------------------------ |:--------------------------------------- |
| POST /users/auth/register                        |    User Register                        |
| POST /users/auth/login                           |    User Login                           |
| POST /users/auth/logout/                         |    User Logout                          |
| POST /users/auth/password-change/                |    User Password Change                 |
| POST /users/auth/password-reset/                 |    User Password Reset                  |
| POST /users/auth/pasword-reset/confirm/          |    User Password Reset Confirm          |
| POST /users/auth/password-reset/validate_token/  |    User Password Reset Validate Token   |
| GET /users/                                      |    Users List                           |
| GET /users/:id                                   |    Users Specific User                  |
| GET /users/:id/profile                           |    Users Specific User Profile          |
| GET /users/userslist                             |    Users List                           |
| GET /users/userprofiles                          |    User Profiles List                   |

<br>

**DOCTORS** <br>

| Requests                                         |      Request Description                |
|:------------------------------------------------ |:--------------------------------------- |
| POST /api/v1/doctors/                            |    Doctors New Doctor                   |
| GET /api/v1/doctors/                             |    Doctors List                         |
| GET /api/v1/doctors/?queryParam="value"          |    Doctors List Query                   |
| GET /api/v1/doctors/:id/                         |    Doctors Specific Doctor              |
| DELETE /api/v1/doctors/:id/                      |    Doctors Delete Specific Doctor       |
| PATCH /api/v1/doctors/:id/                       |    Doctors Update Specific Doctor       |

<br>

**PACIENTS** <br>

| Requests                                         |      Request Description                |
|:------------------------------------------------ |:--------------------------------------- |
| POST /api/v1/pacients/                           |    Pacients New Pacient                 |
| GET /api/v1/pacients/                            |    Pacients List                        |
| GET /api/v1/pacients/?queryParam="value"         |    Pacients List Query                  |
| GET /api/v1/pacients/:id/                        |    Pacients Specific Pacient            |
| DELETE /api/v1/pacients/:id/                     |    Pacients Delete Specific Pacient     |
| PATCH /api/v1/pacients/:id/                      |    Pacients Update Specific Pacient     |

<br>

**ORDERS** <br>


| Requests                                       |      Request Description                 |
|:---------------------------------------------- |:---------------------------------------- |
| POST /api/v1/orders/                           |    Orders New Order                      |
| GET /api/v1/orders/                            |    Orders List                           |
| GET /api/v1/orders/?queryParam="value"         |    Orders List Query                     |
| GET /api/v1/orders/:id/                        |    Orders Specific Order                 |
| DELETE /api/v1/orders/:id/                     |    Orders Delete Specific Order          |
| PATCH /api/v1/orders/:id/                      |    Orders Update Specific Order          |

<br>

**ORDER TYPES** <br>

| Requests                                       |      Request Description                 |
|:---------------------------------------------- |:---------------------------------------- |
| GET /api/v1/order_types/                       |    Order Types List                      |
| GET /api/v1/order_types/?queryParam="value"    |    Order Types List Query                |

<br>

**ORDER STATUS** <br>

| Requests                                       |      Request Description                 |
|:---------------------------------------------- |:---------------------------------------- |
| GET /api/v1/order_status/                      |    Order Status List                     |
| GET /api/v1/order_status/?queryParam="value"   |    Order Status List Query               |

<br>
=======
>>>>>>> dev

| Requests                                        | Request Description                |
| :---------------------------------------------- | :--------------------------------- |
| POST /users/auth/register                       | User Register                      |
| POST /users/auth/login                          | User Login                         |
| POST /users/auth/logout/                        | User Logout                        |
| POST /users/auth/password-change/               | User Password Change               |
| POST /users/auth/password-reset/                | User Password Reset                |
| POST /users/auth/pasword-reset/confirm/         | User Password Reset Confirm        |
| POST /users/auth/password-reset/validate_token/ | User Password Reset Validate Token |
| GET /users/                                     | Users List                         |
| GET /users/:id                                  | Users Specific User                |
| GET /users/:id/profile                          | Users Specific User Profile        |
| GET /users/userslist                            | Users List                         |
| GET /users/userprofiles                         | User Profiles List                 |

<br>

**DOCTORS** <br>

| Requests                                | Request Description            |
| :-------------------------------------- | :----------------------------- |
| POST /api/v1/doctors/                   | Doctors New Doctor             |
| GET /api/v1/doctors/                    | Doctors List                   |
| GET /api/v1/doctors/?queryParam="value" | Doctors List Query             |
| GET /api/v1/doctors/:id/                | Doctors Specific Doctor        |
| DELETE /api/v1/doctors/:id/             | Doctors Delete Specific Doctor |
| PATCH /api/v1/doctors/:id/              | Doctors Update Specific Doctor |

<br>

**PACIENTS** <br>

| Requests                                 | Request Description              |
| :--------------------------------------- | :------------------------------- |
| POST /api/v1/pacients/                   | Pacients New Pacient             |
| GET /api/v1/pacients/                    | Pacients List                    |
| GET /api/v1/pacients/?queryParam="value" | Pacients List Query              |
| GET /api/v1/pacients/:id/                | Pacients Specific Pacient        |
| DELETE /api/v1/pacients/:id/             | Pacients Delete Specific Pacient |
| PATCH /api/v1/pacients/:id/              | Pacients Update Specific Pacient |

<br>

**ORDERS** <br>

| Requests                               | Request Description          |
| :------------------------------------- | :--------------------------- |
| POST /api/v1/orders/                   | Orders New Order             |
| GET /api/v1/orders/                    | Orders List                  |
| GET /api/v1/orders/?queryParam="value" | Orders List Query            |
| GET /api/v1/orders/:id/                | Orders Specific Order        |
| DELETE /api/v1/orders/:id/             | Orders Delete Specific Order |
| PATCH /api/v1/orders/:id/              | Orders Update Specific Order |

<br>

**ORDER TYPES** <br>

| Requests                                    | Request Description    |
| :------------------------------------------ | :--------------------- |
| GET /api/v1/order_types/                    | Order Types List       |
| GET /api/v1/order_types/?queryParam="value" | Order Types List Query |

<br>

**ORDER STATUS** <br>

| Requests                                     | Request Description     |
| :------------------------------------------- | :---------------------- |
| GET /api/v1/order_status/                    | Order Status List       |
| GET /api/v1/order_status/?queryParam="value" | Order Status List Query |

<br>

## Project Stack:

-   **Front-End: Html, CSS, Javascript, Vue, VueX, Vue Router, Vuetify, Axios, FontAwesome, Google Fonts Api;**
-   **Back-End: Python, Django, Django Rest Framework, Django Rest Knox, sqlite;**

## Functionalities:

-   Authentication System using Django Rest Knox based on TokenAuthentication build in Django Rest Framework.
    1. Register,
    2. Login,
    3. Logout,
-   Password Change
-   Password Reset with email using Django Rest PasswordResest,
-   Each user can create an user profile,
-   Different types of permissions for the users,
-   Create/Read/Update/Delete functionalities for doctor, pacient, order,
-   Adding some functionality only for the admin page controlling permissions and data for Order Type and Order S,tatus,
-   Showing list of users and Create/Read/Update/Delete functionalities for the admin,
-   Showing lists of doctors, pacients, order and filtering them using query parameters,
-   Ordering by different fields in the database,

## Upcomming improvements:

-   Adding VueX,
-   Adding Typescript,
-   Improving search list UI,
-   Adding ordering functionality,
-   Adding Password Change page,
-   Adding Password Reset page,
-   Adding User Profile page,
-   Adding User Profile edit page,
-   Adding Doctor Details, Edit pages,
-   Adding Pacient Details, Edit pages,
-   Adding Order Details, Edit pages,
-   Adding Backing up data to Excell functionality on a schedule or by interacting with a frontend element,
-   Adding Alert box,
-   Adding Confirm box,
-   Adding About page,
-   Adding Staff page,
