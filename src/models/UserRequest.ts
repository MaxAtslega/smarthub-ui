interface UserRequest {
    id?: number;
    user_id?: number;
    name: string,
    endpoint: string,
    parameters: string,
}

export default UserRequest;