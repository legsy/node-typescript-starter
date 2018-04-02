import * as sql from 'mssql';
import * as path from 'path';

const config = require(path.resolve("./config.json"));

export function getCompanyList(orgId) {
  return new Promise(async function(resolve, reject) {
    let conn = await sql.connect(config.db);
    try {
        let result = await conn.request()
        .input('OrganizationID', sql.UniqueIdentifier, orgId)
        .input('PageIndex', sql.Int, 1)
        .input('PageSize', sql.Int, 20)
        .output('PageCount', sql.Int)
        .output('RowCount', sql.Int)
        .execute('dbo.Company_List',{
          outFormat: sql.OBJECT
        });
        console.log('query executed');
        //resolve(JSON.stringify(result.recordsets[0]));
        resolve(result.recordsets[0]);
    } catch (err) {
        console.log('Error occurred', err);
        reject(err);
    } finally {
        // If conn assignment worked, need to close.
        if (conn) {
          try {
            await sql.close(conn);
            console.log('connection closed');
          } catch (err) {
            console.log('error closing connection', err);
          }
        }
      }
  });
}
