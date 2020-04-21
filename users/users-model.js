const db = require("../database/dbConfig.js");

module.exports = {
    find,
    findBy,
    add,
    findById,
    findWithPass,
    findByDepartment
}

function find() {
    return db("users").select("id", "username");
}

function findBy(filter) {
    return db("users").select("id", "username")
        .where(filter);
}

function findWithPass(filter) {
    return db("users").where(filter);
}

function findByDepartment(department) {
    return db("users")
        .select("id", "username")
        .where({department:department});
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}