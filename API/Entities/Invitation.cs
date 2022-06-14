using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;
[Table("Invitations")]
public class Invitation
{
    public int Id { get; set; }
   
    public int idUsuario { get; set; }
    public User usuario { get; set; }

    public string coupleName { get; set; }
    public DateTime weddingDate { get; set; }
    public string placeConvite { get; set; }
    public string adressConvite { get; set; }
    
    public int idCity { get; set; }
    public Province city { get; set; }
    public string hourDinnerConvite { get; set; }
    public string transportConvite { get; set; } 
    public string hourTransportConvite { get; set; } 
    public string boyPhone { get; set; } 
    public string girlPhone { get; set; } 
    public string pinCode { get; set; } 

    
}