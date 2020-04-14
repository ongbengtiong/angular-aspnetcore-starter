Angular 9.1.0 [done]

Material 9 [done]

Ngx-Bootstrap [done]

FontAwesome [done]

NGRX 9.0.0 [done]

BPMN-JS [done]
DMN-JS [done]

PrimeNg-Sidebar [done]

Upgrade Angular 8 to 9: Steps and Issues
Followed similar steps and resolved issues in: https://jasontaylor.dev/asp-net-core-angular-9-upgrade/
Issue: https://stackoverflow.com/questions/60189930/timeoutexception-the-angular-cli-process-did-not-start-listening-for-requests-w
Issue: Generating ES5 bundles for differential loading... An unhandled exception occurred: ...\ClientApp\vendor-es2015.js: 'with' in strict mode (136749:4)


TODO:
- REST with GET, POST, PUT, PATCH, DELETE. JsonPatchDocument
- REST API with sort, filter and paging
   - install System.Linq.Dynamic.Core instead of System.Linq.Dynamic
- REST security: Using JWT [done]
- REST data shaping
- REST caching
- EF Core [done]

ASP.NET Core 
- Use ViewModel validation [done]
- UseNodeModules [done]

EF:
- https://app.pluralsight.com/course-player?clipId=a1cd8a69-a4fd-4871-84c9-02a78d60aade
- Install Nuget EntityFrameworkCore SqlServer, EntityFrameworkCore Design
- dotnet tool install dotnet-ef -g
- dotnet ef database update BUT... 
- Pluralsight tutorial resides DbContext in same project as ASP.NET, so...- https://dotnetthoughts.net/using-ef-core-in-a-separate-class-library/
- dotnet ef migrations add <Name> --project ..\Domain\Domain.csproj --startup-project .\Web.csproj --context DataContext
- New System.Text.Json does not support many features of Newtonsoft.Json, so we re-install Microsoft.AspNetCore.Mvc.NewtonsoftJson: https://stackoverflow.com/questions/58006152/net-core-3-not-having-referenceloophandling-in-addjsonoptions
- To drop database: dotnet ef database drop

AutoMapper: [done]
ViewModels:
Identity:
- Microsoft.AspNetCore.Identity.EntityFrameworkCore [done]


Frontend:
NGRX Feature Store: https://itnext.io/ngrx-best-practices-for-enterprise-angular-applications-6f00bcdf36d7
https://dzone.com/articles/separating-state-into-angular-modules-with-ngrx
NGRX Multiple entities: https://medium.com/capital-one-tech/multiple-entities-in-a-single-ngrx-8-state-ed5fd082c3f0