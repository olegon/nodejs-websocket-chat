let iid = 0;

export function User(username, color) {
    iid++;

    return {
        iid,
        username: username || getDefaultName(iid),
        color: color || genColor()
    };
}

export function getPublicUserInfo ({ iid, username, color }, ...objects) {
    let publicInfo = {
        iid,
        username,
        color
    };

    Object.assign(publicInfo, ...objects);

    return publicInfo;
}

function genNumber() {
    return Math.ceil(127 + (Math.random() * 100) % 64);
}

function genColor() {
    return `rgb(${genNumber()}, ${genNumber()}, ${genNumber()})`;
}

function getDefaultName(iid) {
    return `User#${iid}`;
}
