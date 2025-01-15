# Python 2/3 compatibility
from __future__ import print_function

import numpy as np
import cv2 as cv
import sys

modes = (cv.Stitcher_PANORAMA, cv.Stitcher_SCANS)

def main():
    img = [
        'test_img/snail3x7_0.jpg',
        'test_img/snail3x7_1.jpg',
        'test_img/snail3x7_2.jpg',
        'test_img/snail3x7_3.jpg',
        'test_img/snail3x7_4.jpg',
        'test_img/snail3x7_5.jpg',
        'test_img/snail3x7_6.jpg',
        'test_img/snail3x7_7.jpg',
        'test_img/snail3x7_8.jpg',
        'test_img/snail3x7_9.jpg',
        'test_img/snail3x7_10.jpg',
        'test_img/snail3x7_11.jpg',
        'test_img/snail3x7_12.jpg',
        'test_img/snail3x7_13.jpg',
        'test_img/snail3x7_14.jpg',
        'test_img/snail3x7_15.jpg',
        'test_img/snail3x7_16.jpg',
        'test_img/snail3x7_17.jpg',
        'test_img/snail3x7_18.jpg',
        'test_img/snail3x7_19.jpg',
        'test_img/snail3x7_20.jpg',
        'test_img/snail3x7_21.jpg',
        'test_img/snail3x7_22.jpg',
        'test_img/snail3x7_23.jpg',
        'test_img/snail3x7_24.jpg',
        'test_img/snail3x7_25.jpg',
        'test_img/snail3x7_26.jpg',
        'test_img/snail3x7_27.jpg',
        'test_img/snail3x7_28.jpg',
        'test_img/snail3x7_29.jpg',
        'test_img/snail3x7_30.jpg',
        'test_img/snail3x7_31.jpg',
        'test_img/snail3x7_32.jpg',
    ]
    # read input images
    imgs = []
    for img_name in img:
        img = cv.imread(cv.samples.findFile(img_name))
        if img is None:
            print("can't read image " + img_name)
            sys.exit(-1)
        imgs.append(img)


    cv.detail.BestOf2NearestMatcher()
    stitcher = cv.Stitcher.create(cv.Stitcher_PANORAMA)
    status, pano = stitcher.stitch(imgs)

    if status != cv.Stitcher_OK:
        print("Can't stitch images, error code = %d" % status)
        sys.exit(-1)

    cv.imwrite('result.jpg', pano)
    print("stitching completed successfully. %s saved!")

    print('Done')


if __name__ == '__main__':
    main()
    cv.destroyAllWindows()