using FinanceControlAPI.Data;
using FinanceControlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ExpensesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExpensesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
    {
        return await _context.Expenses.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Expense>> GetExpense(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);

        if (expense == null)
        {
            return NotFound();
        }

        return expense;
    }

    [HttpPost]
    public async Task<ActionResult<Expense>> PostExpense(Expense expense)
    {
        // Converter a data para UTC antes de salvar
        expense.Date = DateTime.SpecifyKind(expense.Date, DateTimeKind.Utc);

        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutExpense(int id, Expense expense)
    {
        if (id != expense.Id)
        {
            return BadRequest();
        }

        _context.Entry(expense).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ExpenseExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        if (expense == null)
        {
            return NotFound();
        }

        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ExpenseExists(int id)
    {
        return _context.Expenses.Any(e => e.Id == id);
    }
}
