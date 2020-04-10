using System.ComponentModel.DataAnnotations.Schema;

namespace DSO.DotnetCore.Domain.Core.Base
{
    public class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }

}