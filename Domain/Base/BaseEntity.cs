using System.ComponentModel.DataAnnotations.Schema;

namespace DSO.DotnetCore.Domain.Entities
{
    public class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }

}