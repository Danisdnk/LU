using System.Collections.Generic;
using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface IPostulanteRepository
    {

        void InsertPostulante (Postulante postulante, int idEdicion, int? idPais);
        Postulante GetPostulante (int idPostulante);
        IEnumerable<Postulante> GetPostulantes(int idEdicion);
        IEnumerable<Pais> GetPaises();
        Postulante Update(Postulante postulante, int idPostulante, int? idPais);

    }
}