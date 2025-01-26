using System.ComponentModel.DataAnnotations;

namespace FinanceControlAPI.Models
{
    public class Expense
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
                
        public DateTime Date 
        { 
          get => _date; 
          set => _date = DateTime.SpecifyKind(value, DateTimeKind.Utc); 
        }
        private DateTime _date;
        }
}
