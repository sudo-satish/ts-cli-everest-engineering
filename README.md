# Setup
Clone the repository
```bash
https://github.com/sudo-satish/ts-cli-everest-engineering.git
```
```bash
cd ts-cli-everest-engineering
```
```bash
npm i
```
```bash
npm run build
```

# Background

Kiki, a first-time entrepreneur from the city of Koriko has decided to open a small distance courier service to deliver packages, with her friend Tombo and cat Joji. Kiki has invested in N no. of vehicles and have driver partners to drive each vehicle & deliver packages.


## Problem 1

Delivery Cost Estimation with Offers

Since it’s a new business, the team has decided to pass coupons
around the town which will help them attract more customers.

Discounts Section
<table style="border:0.5px solid gray">
<th>
<td>Distance (km)</td>
<td>Weight (kg)</td>
</th>
<tr>
<td>
OFR001
10% Discount
</td>
<td>< 200</td>
<td>70-200</td>
</tr>

<tr>
<td>
OFR002
7% Discount
</td>
<td>50-150</td>
<td>100-250</td>
</tr>

<tr>
<td>
OFR003
5% Discount
</td>
<td>50-250</td>
<td>10-150</td>
</tr>


</table>

<br>

### Calculate Delivery cost

<code>
Delivery Cost = Base Delivery Cost + (Package Total Weight * 10) +
(Distance to Destination * 5) - Discount Price
</code>

## Script to run the code for problem 1
```bash
node lib/costEstimation.js --baseFare=100 --packages=3
```

Then when asked to enter the package details:
```bash
PKG1 5 5 OFR001
```

## Problem 2

Delivery Time Estimation
Now all these packages should be delivered to their destinations in
the fleet of vehicles Kiki owns. She has N no. of vehicles available for
delivering the packages.

To note: 
<code>
1. Each Vehicle has a on limit (L) maximum weight (kg) that it can carry.
2. All Vehicles travel at the same and in the It is assumed that all the destinations can be covered in a single route.
3. Shipment should contain max packages vehicle can carry in a trip.
4. Should prefer heavier packages when there are multiple shipments with the same no. of packages.
5. If the weights are also the same, preference should be given to the shipment which can be delivered first.
</code>


### How to run the code for problem 2
```bash
node lib/timeEstimation.js --baseFare=100 --packages=5
```

## How to test?
```bash
npm test
```

## How to install globally?
```bash
npm i -g .
```

Then,
```bash
everest --baseFare=100 --packages=1
```