import {userInfo} from '$lib/data/userInfo'

export function load() {
    return {
        title: "User Information Management | BME Automation App",
        users: userInfo
    };
};