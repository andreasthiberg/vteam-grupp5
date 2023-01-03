import { gql } from "@apollo/client";

// GraphQl query to get all scooters
export const SCOOTER_QUERY = gql`
  query ScooterQuery {
    scooters {
      id
    }
  }
`;