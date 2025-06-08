using Microsoft.EntityFrameworkCore;
using crud_api.Model.Base;
using System.ComponentModel.DataAnnotations;

namespace crud_api.DataAccess.Helpers
{
    public static class ModelBuilderConfigExtensions
    {
        public static void SetFKDeleteBehaviour(this ModelBuilder modelBuilder, DeleteBehavior deleteBehavior)
        {
            foreach (var foreignKey in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = deleteBehavior;
            }
        }

        public static void SetCreateTimeDBDefault(this ModelBuilder modelBuilder)
        {
            // Minden saját entitás a BaseEntityből származik
            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(x => x.GetProperties()))
            {
                if (property.PropertyInfo?.DeclaringType == typeof(AuditableEntityBase)
                    && property.PropertyInfo.PropertyType == typeof(DateTime)
                    && property.Name == AuditableEntityBase.PROP_CREATE_DATE_TIME)
                {
                    modelBuilder.Entity(property.DeclaringType.Name)
                        .Property<DateTime>(property.Name)
                        .HasDefaultValueSql("GETDATE()");
                }
            }
        }

        public static void SetNavPropertiesRequiredBasedOnRequiredAttribute(this ModelBuilder modelBuilder)
        {
            foreach (var nav in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetNavigations()))
            {
                if (nav.PropertyInfo != null)
                {
                    bool isRequired = Attribute.IsDefined(nav.PropertyInfo, typeof(RequiredAttribute));
                    if (isRequired)
                    {
                        nav.ForeignKey.IsRequired = true;
                    }
                }
            }
        }
    }
}
