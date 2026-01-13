import {userInfo} from '$lib/data/userInfo'

export function load() {
    return {
        title: "User Access Management | BME Automation App",
        users: userInfo
    };
};