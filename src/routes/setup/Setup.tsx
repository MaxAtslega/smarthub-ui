import {useSelector} from "react-redux";
import {selectCurrentUser, selectUser} from "@/slices/user.slice";
import React from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {store} from "@/store";
import {useUpdateUserMutation} from "@/api/users.api";
import User from "@/models/User";
import keyboardLayouts from "@/constants/keyboardLayouts";

function Setup() {
    const currentUser = useSelector(selectCurrentUser);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [updateUser, {isLoading, error}] = useUpdateUserMutation();

    if (currentUser === null) {
        return <Navigate to="/login" />;
    }

    const handleChangeLanguage = (event: any) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        let user: User = {
            birthday: currentUser.birthday,
            theme: currentUser.theme,
            username: currentUser.username,
            id: currentUser.id,
            language: selectedLanguage,
            keyboard: currentUser.keyboard
        }
        updateUser({user: user});
    };

    const handleChangeKeyboard = (event: any) => {
        const selectedLayout = event.target.value;
        let user: User = {
            birthday: currentUser.birthday,
            theme: currentUser.theme,
            username: currentUser.username,
            id: currentUser.id,
            language: currentUser.language,
            keyboard: selectedLayout
        }
        updateUser({user: user});
    };

    return (
        <div>
            <div className={"bg-special-red"}>{error != undefined ? t('setup.error') : null}</div>
            <h1>{t('setup.title', {username: currentUser.username})}</h1>
            <p>{t('setup.message')}</p>

            <div className="language-setup mb-4">
                <label className={"block mb-2"} htmlFor="language">Select your language:</label>
                <select defaultValue={currentUser.language} className={"w-full px-2 py-3"} id="language"
                        onChange={handleChangeLanguage}>
                    <option value="de">German (Standard)</option>
                    <option value="de-CH">German (Switzerland)</option>
                    <option value="de-AT">German (Austria)</option>
                    <option value="de-LI">German (Liechtenstein)</option>
                    <option value="de-LU">German (Luxembourg)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="en-GB">English (United Kingdom)</option>
                    <option value="en-AU">English (Australia)</option>
                    <option value="es">Spanish (Spain)</option>
                    <option value="es-MX">Spanish (Mexico)</option>
                </select>
            </div>

            <div className="keyboard-setup">
                <label className={"block mb-2"} htmlFor="language">Select your keyboard layout:</label>
                <select defaultValue={currentUser.keyboard} className={"w-full px-2 py-3"} onChange={handleChangeKeyboard} id="language">
                    {Object.keys(keyboardLayouts).map((key: string) => (
                        <option key={key} value={key}>
                            {(keyboardLayouts as {[index: string]:any})[key]}
                        </option>
                    ))}
                </select>
            </div>

            <div className={"mt-8"}>
                <button disabled={isLoading} onClick={() => {
                    store.dispatch(selectUser(null));
                }} className={"bg-special-red text-special-redColor"}>{t('button.exit')}</button>
                <button onClick={() => navigate("/setup/network")} disabled={isLoading} className={"ml-4"}>{t('button.next')}</button>
            </div>


        </div>
    )
}

export default Setup
