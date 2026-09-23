// Module is singleton in TS
// db.ts
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
    private static instance: DatabaseConnectionSingleton;

    private constructor() {
        console.log("Database connection created");
    }

    // Global access point
    public static getInstance(): DatabaseConnectionSingleton {
        if (!DatabaseConnectionSingleton.instance) {
            DatabaseConnectionSingleton.instance = new DatabaseConnectionSingleton();
        }
        return DatabaseConnectionSingleton.instance;
    }

    public query(sql: string) {
        console.log(`Running query: ${sql}`);
    }
}
