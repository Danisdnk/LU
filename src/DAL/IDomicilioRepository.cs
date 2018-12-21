using BackOfficeLU.Models;

namespace BackOfficeLU.DAL
{
    public interface IDomicilioRepository
    {
        void InsertDomicilio (Domicilio domicilio);
        Domicilio GetDomicilio ();
        
    }
    
}