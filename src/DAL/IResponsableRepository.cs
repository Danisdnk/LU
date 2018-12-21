using System.Collections.Generic;
using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface IResponsableRepository
    {
         IEnumerable <Responsable> GetAllResponsables (int idEdicion);


    }

}