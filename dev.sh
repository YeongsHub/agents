#!/bin/bash
tsc -w & TSC=$!
electron . 2> >(grep -vE 'CoreText note:|kern\.hv_vmm_present' >&2) || true
kill $TSC 2>/dev/null
wait $TSC 2>/dev/null
