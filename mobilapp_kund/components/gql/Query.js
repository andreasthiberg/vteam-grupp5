import { gql } from "@apollo/client";

export const SCOOTER_QUERY = gql`
  query ScooterQuery {
    scooters {
      id
    }
  }
`;