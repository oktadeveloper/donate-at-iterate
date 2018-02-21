package com.okta.developer.donate.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
public class DonationStats {
    private Long time;
    private Double money;

    public DonationStats(Long time, Double money) {
        this.time = time;
        this.money = money;
    }
}
