1. Run the application with the command "npm run start:dev".
   After launching the application, the message “listening port http://localhost:3000/” will appear in the terminal.

2. Open the "Postman" application.
   If you don’t know how to use the Postman application, this article will help you learn "https://habr.com/ru/companies/vk/articles/750096/".

   Example queries to help you test my application: 
    1. Query to get all users:
        - Request type "GET"
        - In the "Enter URL" field, enter the string "http://localhost:3000/api/users". 
        
          Click the "send" button.
          After this, in the response field you will see a list of all users from the database.

    2. Request to get user by ID.
        - Request type "GET"
        - In the "Enter URL" field, enter the string "http://localhost:3000/api/users/4881182c-af46-40bb-b652-6608cfbc37ff" or "http://localhost:3000/api/users/7881132c-af16-40bb-b652-5708cfbc37ff". 

        Click the "send" button.
        After this, in the response field you will see data about the user whose ID you entered.

        You can enter other IDs. This example uses two IDs that are already in the database.

    3. Request to delete a user by ID.
        - Request type "DELETE"
        - In the "Enter URL" field, enter the string "http://localhost:3000/api/users/4881182c-af46-40bb-b652-6608cfbc37ff" or "http://localhost:3000/api/users/7881132c-af16-40bb-b652-5708cfbc37ff".

        Click the "send" button.
        After this, you will see the message "user deleted" in the response field.

        You can enter other IDs. This example uses two IDs that are already in the database.

    4. Request to update user data by ID.
        - Request type "PUT"
        - In the "Enter URL" field, enter the string "http://localhost:3000/api/users/4881182c-af46-40bb-b652-6608cfbc37ff" or "http://localhost:3000/api/users/7881132c-af16-40bb-b652-5708cfbc37ff".

        - Go to the "body" tab. Click on "raw". In the field just below, enter {"username": "Maria", "age": 55, "hobbies": ["music"]}.

        Click the "send" button.
        After this, you will see an updated list of users in the response field.

        You can enter other IDs. This example uses two IDs that are already in the database.
        For the fields: “username”, “age” and “hobbies” - you can enter other data.

    5. Request to create a user.
        - Request type "POST"
        - In the "Enter URL" field, enter the string "http://localhost:3000/api/users".

        - Go to the "body" tab. Click on "raw". In the field just below, enter {"username": "Diana", "age": 10, "hobbies": ["drawing"]}.

        Click the "send" button.
        After this, you will see an updated list of users in the response field.

        For the fields: “username”, “age” and “hobbies” - you can enter other data.

-------------------------------------------------------------------------------------

    If you enter an invalid ID, a corresponding message will be displayed.

    If you enter a non-existent ID, a corresponding message will be displayed.

    If you enter an incorrect request, a corresponding message will be displayed.

    If you do not enter all the required fields to create a new user, a corresponding message will be displayed.