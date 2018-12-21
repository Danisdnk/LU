using System.Collections.Generic;
using System.Data.SqlClient;
using BackOfficeLU.Models;
using Dapper;

namespace BackOfficeLU.DAL
{
    public class ResponsableRepository : IResponsableRepository
    {

        private string connStr= @"Server=(localdb)\MSSQLLocalDB;Database=LagashBackOffice;Integrated Security=true";
        
         public IEnumerable <Responsable> GetAllResponsables (int idEdicion)
        {

            var sql = "select * from Responsable where IdEdicion = @IdEdicion";

            using (var conn = new SqlConnection (connStr))
            {

                conn.Open ();

                var responsables = conn.Query<Responsable>(sql, new {IdEdicion = idEdicion} );

                conn.Close ();

                return responsables;

            }

        }

    }
}