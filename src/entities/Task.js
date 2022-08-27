export default class Task {

    id;
    name;
    description;
    important;
    categoryID;
    date;
    done;

    constructor(id, name, description, date, categoryID, important) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.categoryID = categoryID;
        this.important = important;
    }

}