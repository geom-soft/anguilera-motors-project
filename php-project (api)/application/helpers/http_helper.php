<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('doGet'))
{
    function doGet($url){
      $key_test = "sk_test_51H0D1AAFO8r1O9t3roJZLaQDCctjmnX6Pxy82e2xpg8jfrPeV7fNx8aHHVHA7Vas5leqv6PuDFQxEpzmHs9n84w200mcEU9NIP";
      $header = [
        "Authorization: Bearer $key_test"
      ];

      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

      $result = curl_exec($ch);
      curl_close($ch);

      return json_decode($result, true);
    }
}


if ( ! function_exists('doPost'))
{
    function doPost($url, $body){
      $key_test = "sk_test_51H0D1AAFO8r1O9t3roJZLaQDCctjmnX6Pxy82e2xpg8jfrPeV7fNx8aHHVHA7Vas5leqv6PuDFQxEpzmHs9n84w200mcEU9NIP";
      $header = [
        "Authorization: Bearer $key_test"
      ];
      $payloadStr = http_build_query($body);

      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payloadStr);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

      $result = curl_exec($ch);
      curl_close($ch);

      return json_decode($result, true);
    }
}
