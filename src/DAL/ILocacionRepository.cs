using System.Collections.Generic;
using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface ILocacionRepository
    {
        IEnumerable<Locacion> GetAllLocacion ();
        Locacion GetLocacionByNombre(string nombre);
        
    }
}