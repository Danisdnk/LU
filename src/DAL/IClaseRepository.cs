using System;
using System.Collections.Generic;
using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface IClaseRepository
    {
        
        int? GetOrInsertResponsable(Responsable responsable, int idEdicion);
        void InsertClase(Clase clase);
        Clase GetClase(int id);  //get single class

        int SearchClaseRepetida (Clase clase);
        IEnumerable<DateTime> GetFechasClases(int idEdicion);
        IEnumerable<Tema> GetAllTemas(int id);
        IEnumerable<Clase> GetAllClases(int idEdicion);
        IEnumerable<Clase> GetClasesEdicionPorFechas(int idEdicion, DateTime fechaInicio, DateTime fechaFin);
        void Delete(int id);
        Clase Update(Clase clase);

    }

}