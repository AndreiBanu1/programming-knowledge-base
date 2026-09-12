// Module is singleton in TS
// db.ts
class DatabaseConnection {
    constructor() {
        console.log("db created")
    }
}

let db: DatabaseConnection | null = null

export function getDb() {
        if (!db) {
            db = new DatabaseConnection();
        } else {
            return;
        }
    }
}

class DatabaseConnection {
    constructor() {
        console.log("DB created");
    }
}

let db: DatabaseConnection | null = null;

export function getDb() {
    if (!db) {
        db = new DatabaseConnection();
    }
    return db;
}


// Example with class approach as Java
class DatabaseConnectionSingleton {
    private static instance: DatabaseConnection;

    private constructor() {
        console.log("Database connection created");
    }

    // Global access point
    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public query(sql: string) {
        console.log(`Running query: ${sql}`);
    }
}