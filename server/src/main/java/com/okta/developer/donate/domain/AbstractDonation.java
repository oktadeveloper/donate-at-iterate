package com.okta.developer.donate.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Email;

@MappedSuperclass
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class AbstractDonation {
    @Id @GeneratedValue
    Long id;

    @NonNull
    String name;

    @Email
    @NonNull
    @JsonIgnore
    String email;

    @NonNull
    DonationTypes type;
}
