package com.example.sessionauth.entity;

import com.example.sessionauth.enumeration.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * You may understand this as the 'EmployeeRoles' table. Remember the idea that an Employee can have many roles.
 * To keep track of the roles a user has (since there are multiple) we'll use the Role table.
 */

@Table(name = "ROLE")
@Entity
@NoArgsConstructor
@Getter @Setter
public class Role implements Serializable {

    /**
     * An auto-incrementing primary key.
     *
     * updatable = false: So you can't update the primary key after Role is created. Hibernate doesn't allow you to
     * change a primary key, PostgreSQL doesn't allow it, this is basic database knowledge. This is mainly for
     * readability purposes.
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "role_id", updatable = false, nullable = false)
    private Long roleID;


    // So this field will accept only the enumerated values for the role
    @Column(name = "role")
    @Enumerated(value = EnumType.STRING)
    private RoleEnum roleEnum;

    /**
     * There are many roles per one employee. So when we fetch a Role, we'll get the
     * Employee associated with it. So 'employee_id' acts as a foreign key.
     * The 'ForeignKey' annotation is for readability and explicitly showing that it's a foreign key.
     * I mean without it, the foreign key relationship is already established through the '@JoinColumn'
     */
    @ManyToOne
    @JoinColumn(
            name = "employee_id",
            nullable = false,
            referencedColumnName = "employee_id",
            foreignKey = @ForeignKey(name = "role_employee_fk")
    )
    private Employee employee;

    // Constructor for setting the role enumeration associated with an employee's role
    public Role(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

}
