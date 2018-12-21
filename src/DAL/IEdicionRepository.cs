using System.Collections.Generic;
using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface IEdicionRepository
    {
         void Insert(Edicion edicion);
         Edicion GetEdicion(int idEdicion); 
         IEnumerable<Edicion> GetAllEdition();
         IEnumerable<int> GetNumberEdition(int idEdicionExcluido);
         Edicion Update(Edicion edicion);
        IEnumerable<Edicion> GetEdicionesActiva();
         
    }
}