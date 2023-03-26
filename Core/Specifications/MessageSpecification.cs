using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class MessageSpecification : BaseSpecification<Message>
    {
        public MessageSpecification()
        {
        }

        public MessageSpecification(Expression<Func<Message, bool>> criteria) : base(criteria)
        {
        }
    }
}