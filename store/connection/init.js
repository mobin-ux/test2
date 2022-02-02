import { $connection, setConnection } from ".";

$connection.on(setConnection, (_, connection) => connection);
