<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('crypto_rand_secure'))
{
    function crypto_rand_secure($min, $max){
        $range = $max - $min;
        if ($range < 1) return $min; // not so random...
        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1; // length in bytes
        $bits = (int) $log + 1; // length in bits
        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        } while ($rnd > $range);
        return $min + $rnd;
    }
}

if ( ! function_exists('generateToken'))
{
    function generateToken($length){
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet.= "0123456789";
        $max = strlen($codeAlphabet); // edited

        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[crypto_rand_secure(0, $max-1)];
        }

        return $token;
    }
}

if ( ! function_exists('generateCode'))
{
    function generateCode($length){
        $token = "";
        $numericDigits = "0123456789";
        $max = strlen($numericDigits); // edited

        for ($i=0; $i < $length; $i++) {
            $token .= $numericDigits[crypto_rand_secure(0, $max-1)];
        }

        return $token;
    }
}
