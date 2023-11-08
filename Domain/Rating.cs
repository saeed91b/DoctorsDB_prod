using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Rating
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public float Score { get; set; }
    }
}