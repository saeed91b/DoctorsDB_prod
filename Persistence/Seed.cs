using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        private const string genericDescription = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a magna sapien. Aliquam eget erat eros. 
        Integer leo justo, imperdiet vel sagittis sagittis, euismod efficitur enim. Integer maximus orci eu elit volutpat consectetur. 
        Pellentesque quis arcu imperdiet, sollicitudin tellus eu, ornare ipsum. Nulla consectetur diam et accumsan laoreet. Nullam ut sapien ultrices libero mattis luctus. 
        Proin ac pellentesque turpis, in ornare dui. Proin sed dui sed metus egestas tincidunt. Suspendisse eros arcu, vulputate ac varius eget, feugiat in leo.";

        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            // if (!userManager.Users.Any())
            // {
            //     var users = new List<AppUser>
            //     {
            //         new AppUser {DisplayName = "Jack", UserName = "jack", Email = "jack@test.com"},
            //         new AppUser {DisplayName = "Joe", UserName = "joe", Email = "joe@test.com"},
            //         new AppUser {DisplayName = "Sue", UserName = "sue", Email = "sue@test.com"},
            //     };

            //     foreach (var user in users)
            //     {
            //         await userManager.CreateAsync(user, "Pa$$w0rd");
            //     }
            // }

            if (context.Doctors.Any()) return;

            var doctors = new List<Doctor>
            {
                new Doctor
                {
                    FirstName = "Karl",
                    LastName = "Dilkington",
                    Category = "GP",
                    City = "Manchester",
                    Address = "1st str., No. 7",
                    Phone = "+4487008001234",
                    Description = @"Dr. Dilkington recieved his medical degree from University of Manchester in 1995. He worked as a general practitioner at 
                    Manchester Central Hospital for 10 years and has since helped patients at his private practice in Northern Manchester."
                },
                new Doctor
                {
                    FirstName = "David",
                    LastName = "Barlog",
                    Category = "Dermatologist",
                    City = "Los Angeles",
                    Address = "2nd str., No. 9",
                    Phone = "+13238004321",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Abe",
                    LastName = "Simpson",
                    Category = "Dermatologist",
                    City = "Springfield",
                    Address = "3rd str., No. 5",
                    Phone = "+13708001236",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Bill",
                    LastName = "Hickock",
                    Category = "Surgeon",
                    City = "Deadwood",
                    Address = "6th str., No. 66",
                    Phone = "+16058001234",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Thomas",
                    LastName = "Greenwood",
                    Category = "Dentist",
                    City = "Manchester",
                    Address = "1st str., No. 2",
                    Phone = "+4487008001232",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Robert",
                    LastName = "Gallup",
                    Category = "GP",
                    City = "Paris",
                    Address = "1st str., No. 7",
                    Phone = "+33140768352",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Shigeru",
                    LastName = "Mikami",
                    Category = "Ophtalmologist",
                    City = "Osaka",
                    Address = "1st str., No. 10",
                    Phone = "+816678001234",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Ho",
                    LastName = "Lee",
                    Category = "Dermatologist",
                    City = "Melbourne",
                    Address = "2nd str., No. 9",
                    Phone = "+610308001235",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Alex",
                    LastName = "Lord",
                    Category = "Dentist",
                    City = "Melbourne",
                    Address = "1st str., No. 2",
                    Phone = "+610308007232",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Bob",
                    LastName = "Richards",
                    Category = "Gastroenterologist",
                    City = "Los Angeles",
                    Address = "3rd str., No. 5",
                    Phone = "+13238001236",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Barney",
                    LastName = "Gumble",
                    Category = "Dentist",
                    City = "Springfield",
                    Address = "4th str., No. 10",
                    Phone = "+13708904054",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Parvin",
                    LastName = "Hooshmand",
                    Category = "Surgeon",
                    City = "Paris",
                    Address = "2nd str., No. 7",
                    Phone = "+33109758351",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Arslan",
                    LastName = "Honey",
                    Category = "Opthalmologist",
                    City = "Paris",
                    Address = "10th str., No. 12",
                    Phone = "+33141765450",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Eiji",
                    LastName = "Harada",
                    Category = "Dermatologist",
                    City = "Osaka",
                    Address = "5th str., No. 7",
                    Phone = "+816607801565",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Al",
                    LastName = "Swerengen",
                    Category = "Gastroenterologist",
                    City = "Deadwood",
                    Address = "1st str., No. 8",
                    Phone = "+16051800888",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Barnis",
                    LastName = "Baktanians",
                    Category = "Gastroenterologist",
                    City = "Los Angeles",
                    Address = "1st str., No. 1",
                    Phone = "+13238420176",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Diego",
                    LastName = "Umehuarez",
                    Category = "GP",
                    City = "Osaka",
                    Address = "3rd str., No. 1",
                    Phone = "+816603871562",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Hans",
                    LastName = "Moleman",
                    Category = "Ophtalmologist",
                    City = "Springfield",
                    Address = "1st str., No. 26",
                    Phone = "+13708904051",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Steven",
                    LastName = "Moriss",
                    Category = "GP",
                    City = "Manchester",
                    Address = "2nd str., No. 2",
                    Phone = "+4487508041637",
                    Description = genericDescription
                },
                new Doctor
                {
                    FirstName = "Yoshio",
                    LastName = "Igarashi",
                    Category = "Surgeon",
                    City = "Osaka",
                    Address = "1st str., No. 1",
                    Phone = "+816694029762",
                    Description = genericDescription
                },

            };

            string[] userNames =  {"Bob127", "Jame475", "Jess231", "Rob896", "Tom742"};

            foreach (Doctor doctor in doctors)
            {
                foreach (string userName in userNames)
                {
                    float score = (float)Random.Shared.Next(1, 6);
                    Rating rating = new() { UserName = userName, Score = score};
                    doctor.Ratings.Add(rating);
                }

                doctor.AverageRating = doctor.Ratings.Select(x => x.Score).Average();
            }

            await context.Doctors.AddRangeAsync(doctors);
            await context.SaveChangesAsync();
        }
    }
}