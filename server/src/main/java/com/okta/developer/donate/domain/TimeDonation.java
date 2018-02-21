package com.okta.developer.donate.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import java.net.URL;

@Entity
@Table(name = "donation")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TimeDonation extends AbstractDonation {

    @NonNull
    String projectName;

    @Min(0)
    Integer hours;

    URL projectUrl;
}
