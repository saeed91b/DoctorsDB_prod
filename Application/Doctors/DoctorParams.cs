using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Doctors
{
    public class DoctorParams : PagingParams
    {
        public string FilterType { get; set; }
        public string FilterValue { get; set; }
        public bool OrderByRating { get; set; }
    }
}