interface UserAction {
    id?: number,
    user_id?: number,
    rfid_uid: string,
    type_name?: string,
    details?: string,
}

export default UserAction;