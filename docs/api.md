1. `/api/chats/rename/:id`
   - **Method**: `POST`
   - **Description**: Renames a chat with the unique ID.
   - **Body Example**:
     ```json
     {
       "title": "New Chat Title"
     }
     ```
   - **Response Example**:
     ```json
     {
       "message": "Chat renamed successfully"
     }
     ```

2. `/api/chats/delete/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a chat with the unique ID.
   - **Response Example**:
     ```json
     {
       "message": "Chat deleted successfully"
     }
     ```
