from setuptools import setup

setup(
    name='lektor-extended-links',
    version='0.1',
    author=u'sephii',
    author_email='',
    license='MIT',
    py_modules=['lektor_extended_links'],
    entry_points={
        'lektor.plugins': [
            'extended-links = lektor_extended_links:ExtendedLinksPlugin',
        ]
    }
)
